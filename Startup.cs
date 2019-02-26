using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

using Newtonsoft.Json;

using Shine.Data;
using Shine.Data.Dto._Mapster;
using Shine.Data.Infrastructures.Interfaces;
using Shine.Data.Infrastructures.Repositories;
using Shine.Data.Models;
using Shine.Data.Models.Interfaces;

namespace Shine
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)

        {

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            // Add EF support for SqlServer
            services.AddEntityFrameworkSqlServer();

            // Add ASP.NET Identity support
            services.AddIdentity<IdentityUser, IdentityRole>(opts =>
            {
                opts.Password.RequireDigit = true;
                opts.Password.RequireLowercase = true;
                opts.Password.RequireUppercase = true;
                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequiredLength = 7;
            }).AddEntityFrameworkStores<AppDbContext>();

            // Add Authentication with JWT Tokens
            services.AddAuthentication(opts =>
            {
                opts.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                // Only disable when development
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    // Standard configuration
                    ValidIssuer = Configuration["Auth:Jwt:Issuer"],
                    ValidAudience = Configuration["Auth:Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Configuration["Auth:Jwt:Key"])
                    ),
                    ClockSkew = TimeSpan.Zero,

                    // Security switches
                    RequireExpirationTime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true
                };
            });

            services.AddScoped(typeof(IRepository), typeof(Repository));
            services.AddScoped<TokenRepository>();
            services.AddScoped<ProductBuyRepository>();
            services.AddScoped<ProductSellRepository>();
            services.AddScoped<CategoryBuyRepository>();
            services.AddScoped<CategorySellRepository>();
            services.AddScoped<CountryRepository>();
            services.AddScoped<SupplierRepository>();

            // services.AddScoped<RepositoryFactory>();

            // Using AddDbContextPool for performences
            services.AddDbContextPool<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection_dk"));
            });

            // services.AddDbContextPool<AppDbContext>(options => 
            //     options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));           

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // UseCors must before UseMvc
            app.UseCors("AllowAll");
            // UseAuthentication() must before UseMvc
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            // Load MapsterConfig
            MapsterSetting.Load();

#region Seeder
            // Create a service scope to get an AppDbContext instance using DI
            using(var serviceScope =
                app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetService<AppDbContext>();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<IdentityUser>>();

                // Create the Db if it doesn't exist and applies any pending migration
                // dbContext.Database.Migrate();

                // Seed the Db
                DbSeeder.Seed(dbContext, roleManager, userManager);
            }
#endregion
        }
    }
}
