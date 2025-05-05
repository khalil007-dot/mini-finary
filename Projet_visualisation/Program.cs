using Microsoft.EntityFrameworkCore;
using Projet_visualisation.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Swagger UI
builder.Services.AddSwaggerGen(); // Swagger UI

// connection DbContext avec mon sqlServer
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseSqlServer("Server=localhost;Database=MiniFinaryDb;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;"));

// autorisation de cors pour le lancement de l'api en http
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

var app = builder.Build();

// Active Swagger  en développement
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

app.Run();
