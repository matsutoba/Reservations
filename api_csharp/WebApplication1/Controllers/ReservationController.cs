using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reservation.Entity;
using Reservation.Model.Response;

namespace Reservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private ReservationContext _context;
        private readonly ILogger<ReservationController> _logger;

        public ReservationController(
            ReservationContext context,
            ILogger<ReservationController> logger
        )
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet("")]
        public ActionResult<List<Reservation.Entity.Reservation>> Get()
        {
            var result = _context.Reservations.Include(e => e.Customer).ToList<Reservation.Entity.Reservation>();
            return Ok(result);
        }

        [HttpGet("{date}/reservations")]
        public ActionResult<Reservation.Entity.Reservation> Get(string date)
        {
            var today = new DateTime();

            var result = _context.Reservations.AsNoTracking()
                .Include("Customer")
                .Include("TimeFrame")
                .Include("TimeFrame.Frame")
                .Include("TimeFrame.Frame.Facility")
                .Where(e => e.ReservationDate == date)
                //.Where(e => e.TimeFrame.Frame.StartDate <= today)
                //.Where(e => e.TimeFrame.Frame.EndDate >= today)
                .ToList();
            /*
            if (result.Any())
            {
                return NotFound();
            }
            */

            var reservations = new List<ReservationResponseModel>();
            result.ForEach(e =>
            {
                reservations.Add(new ReservationResponseModel
                {
                    ReservationId = e.ReservationId,
                    CustomerId = e.CustomerId,
                    Name = e.Customer.Name,
                    DayOfWeek = e.TimeFrame.DayOfWeek,
                    StartTime = e.TimeFrame.StartTime,
                    EndTime = e.TimeFrame.EndTime,
                    FacilityId = e.TimeFrame.Frame.FacilityId,
                    FacilityName = e.TimeFrame.Frame.Facility.Name
                });
            });


            return Ok(reservations);
        }

        [HttpPost("{date}/customer/{customerId}/timeframe/{timeFrameId}")]
        public ActionResult Post(string date, int customerId, int facilityId, int timeFrameId)
        {
            var reservation = new Reservation.Entity.Reservation
            {
                ReservationDate = date,
                CustomerId = customerId,
                TimeFrameId = timeFrameId,
            };

            _context.Reservations.Add(reservation);
            _context.SaveChanges();

            return Ok();
        }
    }
}
