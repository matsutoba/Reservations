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
    public class CustomerController : ControllerBase
    {
        private ReservationContext _context;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(
            ReservationContext context,
            ILogger<CustomerController> logger
        )
        {
            _context = context;
            _logger = logger;

        }


        [HttpGet("")]
        public ActionResult<List<Customer>> Get()
        {
            /*
            var result = _context.Customers
                .Include("Reservations")
                .Include("Reservations.TimeFrame")
                .Include("Reservations.TimeFrame.Frame")
                .Include("Reservations.TimeFrame.Frame.Facility")
                .ToList<Customer>();
            */
            var result = _context.Customers
                .Include("Reservations")
                .Include("Reservations.TimeFrame")
                .Include("Reservations.TimeFrame.Frame")
                .Include("Reservations.TimeFrame.Frame.Facility")
                .ToList<Customer>();

            var customers = new List<CustomerResponseModel>();
            result.ForEach(e =>
            {
                customers.Add(new CustomerResponseModel
                {
                    CustomerId = e.CustomerId,
                    Name = e.Name
                });
            });

            return Ok(customers);
        }

        
        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomer(int id)
        {
            var query = _context.Customers
                .Where(e => e.CustomerId == id);
            var result = query.FirstOrDefault();

            if (result == null)
            {
                return NotFound();
            }

            var customer = new CustomerResponseModel
            {
                CustomerId = result.CustomerId,
                Name = result.Name
            };

            return Ok(customer);
        }

        [HttpGet("{id}/reservation")]
        public ActionResult<Customer> GetReservcation(int id)
        {
            var query = _context.Customers
                .Include(c => c.Reservations)
                .Include(c => c.Reservations.Select(r => r.TimeFrame).First())
                .Where(e => e.CustomerId == id);
            var result = query.FirstOrDefault();

            if (result == null)
            {
                return NotFound();
            }
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

        [HttpPatch("{id}")]
        public ActionResult Patch([FromBody] CustomerRequestModel model)
        {
            var customer = _context.Customers.FirstOrDefault(e => e.CustomerId == model.CustomerId);
            customer.Name = model.Name;
            _context.SaveChanges();
            return Ok();
        }


        [HttpPost("{id}/reservation")]
        public ActionResult Post(int id, [FromBody] RegistReservationRequestModel model)
        {

            var customer = _context.Customers.Where(e => e.CustomerId == id).FirstOrDefault();
            if (customer == null)
            {
                return NotFound();
            }

            var reservation = new Reservation.Entity.Reservation
            {
                CustomerId = id,
                ReservationDate = model.ReservationDate,
                TimeFrameId = model.ReservationTimeFrameId
            };

            _context.Reservations.Add(reservation);
            _context.SaveChanges();

            return Ok();

        }

    }
}
