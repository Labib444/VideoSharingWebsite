using API.Data;
using API.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using System.Web.Http.Cors;

namespace API.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;
        public static IWebHostEnvironment _environment;

        public UserController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IEnumerable<User>> Get() => await _context.Users.ToListAsync();


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(User), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpGet("/GetByEmail/{email}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(User), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByEmail(string email)
        {
            List<User> user = await _context.Users.Where( x => x.Email.Equals(email) ).ToListAsync(); //returns true or false
            return user.Count == 0 ? Ok("NOT FOUND") : Ok(user[0]);
        }

        //[EnableCors("https://localhost:3000","*", "*")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();    
            return CreatedAtAction(nameof(GetById), new { id = user.UId }, user);
        }


        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(int id, User user)
        {
            if (id != user.UId) return BadRequest();
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Users.FindAsync(id);
            if (product == null) return NotFound();
            _context.Users.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
