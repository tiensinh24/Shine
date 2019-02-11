using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CategoryName = table.Column<string>(maxLength: 100, nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    CountryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ContinentName = table.Column<string>(nullable: true),
                    ContinentCode = table.Column<string>(nullable: true),
                    CountryName = table.Column<string>(nullable: true),
                    TwoLetterCountryCode = table.Column<string>(nullable: true),
                    ThreeLetterCountryCode = table.Column<string>(nullable: true),
                    CountryNumber = table.Column<int>(nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.CountryId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tokens",
                columns: table => new
                {
                    TokenId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tokens", x => x.TokenId);
                    table.ForeignKey(
                        name: "FK_Tokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Specification = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    ProductType = table.Column<bool>(nullable: false),
                    CategoryId = table.Column<int>(nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    PersonId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PersonType = table.Column<int>(nullable: false),
                    PersonNumber = table.Column<string>(nullable: true),
                    Gender = table.Column<bool>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: false),
                    Telephone = table.Column<string>(nullable: true),
                    Fax = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.PersonId);
                    table.ForeignKey(
                        name: "FK_Persons_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OrderNumber = table.Column<string>(maxLength: 50, nullable: false),
                    DateOfIssue = table.Column<DateTime>(type: "date", nullable: false),
                    PaymentDateOne = table.Column<DateTime>(type: "date", nullable: false),
                    PaymentOne = table.Column<decimal>(nullable: false),
                    PaymentDateTwo = table.Column<DateTime>(type: "date", nullable: false),
                    PaymentTwo = table.Column<decimal>(nullable: false),
                    TimeForPayment = table.Column<DateTime>(type: "date", nullable: false),
                    OrderType = table.Column<bool>(nullable: false),
                    PersonId = table.Column<string>(nullable: true),
                    PersonId1 = table.Column<int>(nullable: true),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    LocalOrderNumber = table.Column<string>(maxLength: 50, nullable: true),
                    LocalDateOfIssue = table.Column<DateTime>(type: "date", nullable: true),
                    Currency = table.Column<string>(maxLength: 10, nullable: true),
                    RateOne = table.Column<decimal>(type: "decimal(7,2)", nullable: true),
                    RateTwo = table.Column<decimal>(type: "decimal(7,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Persons_PersonId1",
                        column: x => x.PersonId1,
                        principalTable: "Persons",
                        principalColumn: "PersonId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PersonProducts",
                columns: table => new
                {
                    PersonId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonProducts", x => new { x.PersonId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_PersonProducts_Persons_PersonId",
                        column: x => x.PersonId,
                        principalTable: "Persons",
                        principalColumn: "PersonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Costs",
                columns: table => new
                {
                    CostId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Value = table.Column<decimal>(nullable: false),
                    InvoiceId = table.Column<int>(nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Costs", x => x.CostId);
                    table.ForeignKey(
                        name: "FK_Costs_Orders_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductOrders",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    Specification = table.Column<string>(nullable: true),
                    Quantity = table.Column<decimal>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    Tax = table.Column<decimal>(nullable: false),
                    ProductOrderType = table.Column<bool>(nullable: false),
                    CreatedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    CreatedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ModifiedById = table.Column<int>(nullable: false, defaultValueSql: "0"),
                    ModifiedOn = table.Column<DateTime>(nullable: false, defaultValueSql: "GetUtcDate()"),
                    Rate = table.Column<decimal>(nullable: true),
                    Unit = table.Column<string>(nullable: true),
                    LocalQuantity = table.Column<decimal>(nullable: true),
                    LocalPrice = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOrders", x => new { x.ProductId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_ProductOrders_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductOrders_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Costs_InvoiceId",
                table: "Costs",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderNumber",
                table: "Orders",
                column: "OrderNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PersonId1",
                table: "Orders",
                column: "PersonId1");

            migrationBuilder.CreateIndex(
                name: "IX_PersonProducts_ProductId",
                table: "PersonProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Persons_CountryId",
                table: "Persons",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrders_OrderId",
                table: "ProductOrders",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_UserId",
                table: "Tokens",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Costs");

            migrationBuilder.DropTable(
                name: "PersonProducts");

            migrationBuilder.DropTable(
                name: "ProductOrders");

            migrationBuilder.DropTable(
                name: "Tokens");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Persons");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
