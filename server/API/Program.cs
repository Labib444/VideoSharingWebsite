using API.Data;
using Microsoft.EntityFrameworkCore;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        //policy.AllowAnyOrigin();
        //policy.WithOrigins("http://localhost:3000",
        //                        "http://localhost:7200");
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var DB_HOST = "LABIB-COMPUTER\\SQLEXPRESS";
var DB_NAME = "VideoSharingDb";
var DB_SA_PASSWORD = "Labib1234!";
var CONNECTION_STRING = $"Data Source={DB_HOST};Initial Catalog={DB_NAME};User ID=sa;Password={DB_SA_PASSWORD}";


builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(
    //builder.Configuration.GetConnectionString("DefaultConnection")
    CONNECTION_STRING
));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
