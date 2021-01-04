using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Reservation.Entity;

namespace Reservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private ReservationContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(
            ReservationContext context,
            ILogger<UserController> logger
        )
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet("")]
        public ActionResult<List<User>> Get()
        {
            var result = _context.Users.ToList<User>();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            var result = _context.Users.FirstOrDefault<User>(e => e.Id == id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
