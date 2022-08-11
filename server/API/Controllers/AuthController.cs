using API.Data;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly AppDbContext _context;
        public static IWebHostEnvironment _environment;
        public static string TOKEN = "It is a secret key for jwt system.";
        public AuthController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }


        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User request)
        {
            //CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            //request.Password = Encoding.UTF8.GetString(passwordHash);
            //request.PasswordSalt = passwordSalt;

            await _context.AddAsync(request);
            await _context.SaveChangesAsync();
            
            //return CreatedAtAction(nameof(Register), new { id = request.UId }, request);
            return Ok("Registration Completed!");
        }


        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User request)
        {
            List<User> user = await _context.Users.Where(x => x.Email.Equals(request.Email)).ToListAsync();
            if( user.Count == 0 )
            {
                return NotFound("User Not Found!");
            }

            //byte[] inPassword     = Encoding.UTF8.GetBytes( request.Password );
            //byte[] outPassword    = Encoding.UTF8.GetBytes( user[0].Password );
            //byte[] PasswordSalt   = user[0].PasswordSalt;

            //if ( !VerifyPasswordHash(inPassword, outPassword, PasswordSalt) )
            //{
            //    return BadRequest("Wrong password.");
            //}

            if ( !user[0].Password.Equals(request.Password) )
            {
                return BadRequest("Wrong password.");
            }

            //string token = CreateToken(user);
            //var refreshToken = GenerateRefreshToken();
            //SetRefreshToken(refreshToken);
            string token = CreateToken(request);

            return Ok(token);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(TOKEN));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(byte[] inPass, byte[] outPass, byte[] salt)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                byte[] computedHash = hmac.ComputeHash(inPass);
                if (computedHash.SequenceEqual(outPass))
                    return true;
                else
                    return false;
            }
        }


    }
}
