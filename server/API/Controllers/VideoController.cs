using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/Video")]
    [ApiController]
    public class VideoController : Controller
    {
        private readonly AppDbContext _context;
        public static IWebHostEnvironment _environment;

        public VideoController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet]
        public async Task<IEnumerable<Video>> Get() => await _context.Videos.ToListAsync();


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Video), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Video), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            var user = await _context.Users.FindAsync(video.UId);
            video.user = user;
            return video == null ? NotFound() : Ok(video);
        }


        [HttpPut("UpdateViewById/{id}")]
        [ProducesResponseType(typeof(Video), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Video), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateViewById(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            video.Views += 1;
            _context.Entry(video).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return video == null ? NotFound() : Ok(video);
        }

        [HttpGet("GetUserVideos/{id}")]
        [ProducesResponseType(typeof(Video), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Video), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetVideosByUserId(int id)
        {
            var video = await _context.Videos.Where(x => x.UId == id).ToListAsync();
            return video == null ? NotFound() : Ok(video);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVideo(Video video)
        {
            video.user = null;
            await _context.Videos.AddAsync(video);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
