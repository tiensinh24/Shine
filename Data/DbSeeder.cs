using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Shine.Data
{
    public class DbSeeder
    {
        public static void Seed (AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager)
        {
            if (!context.Users.Any())
            {
                // Create default Users (if there are none)
                CreateUsers(context, roleManager, userManager)
                    .GetAwaiter()
                    .GetResult();
            }
        }

        private static async Task CreateUsers(AppDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager)
        {
            #region Create Roles
            string role_Administrator = "Administrator";
            string role_RegisteredUser = "RegisteredUser";

            // Create Roles (if they aren't exists yet)
            if (!await roleManager.RoleExistsAsync(role_Administrator))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Administrator));
            }

            if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
            {
                await roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
            }
            #endregion

            #region Create Admin user
            // Create the "Admin" IdentityUser account
            var user_Admin = new IdentityUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@shine.com"
            };

            // Insert "Admin" into the Db and assign the "Administrator" & "RegisteredUser" roles to him
            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, "Pass4Admin");
                await userManager.AddToRoleAsync(user_Admin, role_RegisteredUser);
                await userManager.AddToRoleAsync(user_Admin, role_Administrator);

                // Remove Lockout and E-Mail confirmation.
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }
            #endregion

            #region Create Registered users
            // Create some sample  registered user accounts
            var user_Ryan = new IdentityUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Ryan",
                Email = "ryan@shine.com"
            };

            var user_Solice = new IdentityUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Solice",
                Email = "solice@shine.com"
            };

            var user_Vodan = new IdentityUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Vodan",
                Email = "vodan@shine.com"
            };

            // Insert sample users into the Db & also assign the "Registered" role to them
            if (await userManager.FindByNameAsync(user_Ryan.UserName) == null)
            {
                await userManager.CreateAsync(user_Ryan, "Pass4Ryan");
                await userManager.AddToRoleAsync(user_Ryan, role_RegisteredUser);

                // Remove Lockout & E-Mail confirmation
                user_Ryan.EmailConfirmed = true;
                user_Ryan.LockoutEnabled = false;
            }

            if (await userManager.FindByNameAsync(user_Solice.UserName) == null)
            {
                await userManager.CreateAsync(user_Solice, "Pass4Solice");
                await userManager.AddToRoleAsync(user_Solice, role_RegisteredUser);

                // Remove Lockout & E-Mail confirmation
                user_Solice.EmailConfirmed = true;
                user_Solice.LockoutEnabled = false;
            }

            if (await userManager.FindByNameAsync(user_Vodan.UserName) == null)
            {
                await userManager.CreateAsync(user_Vodan, "Pass4Vodan");
                await userManager.AddToRoleAsync(user_Vodan, role_RegisteredUser);

                // Remove Lockout & E-Mail confirmation
                user_Vodan.EmailConfirmed = true;
                user_Vodan.LockoutEnabled = false;
            }
            #endregion
            await context.SaveChangesAsync();
        }
    }
}