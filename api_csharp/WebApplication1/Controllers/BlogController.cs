using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reservation.Entity;

namespace Reservation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private ReservationContext _context;
        private readonly ILogger<BlogController> _logger;

        public BlogController(
            ReservationContext context,
            ILogger<BlogController> logger
        )
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet("")]
        public ActionResult<List<Blog>> Get()
        {
            var result = _context.Blogs.Include(b => b.Posts).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult<Blog> Get(int id)
        {
            var result = _context.Blogs.Include(b =>b.Posts).FirstOrDefault(b => b.BlogId == id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("{id}")]
        public ActionResult<Blog> Post(int id)
        {
            var post = new Post
            {
                PostId = 2,
                Title = "aaa",
                Content = "bbb",
                BlogId = 2,
            };

            var blog = new Blog
            {
                BlogId = 2,
                Url = "http://xxx.bbb.ccc"
            };

            post.Blog = blog;

            _context.Posts.Add(post);
            _context.SaveChanges();

            return Ok();
        }

    }
}
