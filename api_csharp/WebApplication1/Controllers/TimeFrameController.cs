using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reservation.Entity;
using Reservation.Model.Request;
using Reservation.Model.Response;

namespace Reservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimeFrameController : ControllerBase
    {
        private ReservationContext _context;
        private readonly ILogger<TimeFrameController> _logger;

        public TimeFrameController(
            ReservationContext context,
            ILogger<TimeFrameController> logger
        )
        {
            _context = context;
            _logger = logger;

        }

       
        [HttpGet("{id}")]
        public ActionResult<Customer> Get(int id)
        {
            var query = _context.TimeFrames
                .Include("Frame")
                .Where(e => e.Frame.FacilityId == id)
                .ToList();

            var result = new List<TimeFrameResponseModel>();
            query.ForEach(e =>
            {
                result.Add(new TimeFrameResponseModel
                {
                    TimeFrameId = e.TimeFrameId,
                    DayOfWeek = e.DayOfWeek,
                    FrameId = e.FrameId,
                    StartTime = e.StartTime,
                    EndTime = e.EndTime,
                });
            });

            return Ok(result);
        }


        [HttpPost("")]
        public ActionResult Post([FromBody] CustomerRequestModel model)
        {
            // var customer = _context.Customers.FirstOrDefault(e => e.Id == model.Id);

            var customer = new Customer
            {
                Name = model.Name
            };

            _context.Customers.Add(customer);
            _context.SaveChanges();
            

            return Ok();
        }

    }
}
