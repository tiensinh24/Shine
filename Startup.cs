using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Shine.Data;
using Shine.Data.Dto._Mapster;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Infrastructures.Services;
using Shine.Helpers;

namespace Shine {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services)

        {

            services.AddMvc ().SetCompatibilityVersion (CompatibilityVersion.Version_2_2)
                .AddJsonOptions (options => {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            // Add EF support for SqlServer
            services.AddEntityFrameworkSqlServer ();

            // Add ASP.NET Identity support
            services.AddIdentity<IdentityUser, IdentityRole> (opts => {
                opts.Password.RequireDigit = true;
                opts.Password.RequireLowercase = true;
                opts.Password.RequireUppercase = true;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequiredLength = 7;
            }).AddEntityFrameworkStores<AppDbContext> ();

            // Add Authentication with JWT Tokens
            services.AddAuthentication (opts => {
                opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (cfg => {
                // Only disable when development
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters () {
                    // Standard configuration
                    ValidIssuer = Configuration["Auth:Jwt:Issuer"],
                    ValidAudience = Configuration["Auth:Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey (
                    Encoding.UTF8.GetBytes (Configuration["Auth:Jwt:Key"])
                    ),
                    ClockSkew = TimeSpan.Zero,

                    // Security switches
                    RequireExpirationTime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddTransient<UserResolverService> ();

            services.AddScoped (typeof (IRepository), typeof (Repository));
            services.AddScoped<ITokenRepository, TokenRepository> ();
            services.AddScoped<IProductRepository, ProductRepository> ();
            services.AddScoped<IProductBuyRepository, ProductBuyRepository> ();
            services.AddScoped<IProductSellRepository, ProductSellRepository> ();
            services.AddScoped<ICategoryBuyRepository, CategoryBuyRepository> ();
            services.AddScoped<ICategorySellRepository, CategorySellRepository> ();
            services.AddScoped<ICountryRepository, CountryRepository> ();
            services.AddScoped<IDepartmentRepository, DepartmentRepository> ();
            services.AddScoped<IEmployeeRepository, EmployeeRepository> ();
            services.AddScoped<ISupplierRepository, SupplierRepository> ();
            services.AddScoped<ICustomerRepository, CustomerRepository> ();
            services.AddScoped<IOrderBuyRepository, OrderBuyRepository> ();
            services.AddScoped<IOrderSellRepository, OrderSellRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository> ();
            services.AddScoped<ICostRepository, CostRepository> ();
            services.AddScoped<IPhotoRepository, PhotoRepository> ();
            services.AddScoped<IStorageRepository, StorageRepository> ();

            services.AddEntityFrameworkSqlServer ();

            services.AddDbContextPool<AppDbContext> ((serviceProvider, optionsBuilder) => {
                optionsBuilder.UseSqlServer (Configuration.GetConnectionString ("DefaultConnection_dk"));
                optionsBuilder.UseInternalServiceProvider (serviceProvider);
            });

            services.AddCors (options => {
                options.AddPolicy ("AllowAll", builder => {
                    builder.AllowAnyOrigin ()
                        .AllowAnyMethod ()
                        .AllowAnyHeader ();
                });
            });

            // Setting Cloudinary image upload
            services.Configure<CloudinarySettings> (Configuration.GetSection ("CloudinarySettings"));

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles (configuration => {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler ("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts ();
            }

            app.UseHttpsRedirection ();
            app.UseStaticFiles ();
            app.UseSpaStaticFiles ();

            // UseCors must before UseMvc
            app.UseCors ("AllowAll");
            // UseAuthentication() must before UseMvc
            app.UseAuthentication ();

            app.UseMvc (routes => {
                routes.MapRoute (
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa (spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment ()) {
                    spa.UseAngularCliServer (npmScript: "start");
                }
            });

            // Load MapsterConfig
            MapsterSetting.Load ();

            #region Seeder
            // Create a service scope to get an AppDbContext instance using DI
            using (var serviceScope =
                app.ApplicationServices.GetRequiredService<IServiceScopeFactory> ().CreateScope ()) {
                var dbContext = serviceScope.ServiceProvider.GetService<AppDbContext> ();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>> ();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<IdentityUser>> ();

                // Create the Db if it doesn't exist and applies any pending migration
                dbContext.Database.Migrate ();

                // Seed the Db
                DbSeeder.Seed (dbContext, roleManager, userManager);
            }
            #endregion
        }
    }
}