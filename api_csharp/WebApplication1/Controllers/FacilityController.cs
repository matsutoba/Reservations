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
    public class FacilityController : ControllerBase
    {
        private ReservationContext _context;
        private readonly ILogger<FacilityController> _logger;

        public FacilityController(
            ReservationContext context,
            ILogger<FacilityController> logger
        )
        {
            _context = context;
            _logger = logger;

        }


        [HttpGet("")]
        public ActionResult<List<Facility>> Get()
        {
            var result = _context.Facilities
                .ToList<Facility>();
            return Ok(result);
        }

        
        [HttpGet("{id}")]
        public ActionResult<Facility> Get(int id)
        {
            var query = _context.Facilities
                .Where(e => e.Id == id);
            var result = query.FirstOrDefault();

            if (result == null)
            {
                return NotFound();
            }

            var facility = new Facility
            {
                Id = result.Id,
                Name = result.Name
            };

            return Ok(facility);
        }


        [HttpPost("{id}")]
        public ActionResult Post([FromBody] FacilityRequestModel model)
        {
            var facility = _context.Facilities.FirstOrDefault(e => e.Id == model.Id);
            facility.Name = model.Name;
            _context.SaveChanges();
            
            return Ok();
        }

    }
}
