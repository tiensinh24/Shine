using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class FKUsersi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_CreatedBy",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_ModifiedBy",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Costs_AspNetUsers_CreatedBy",
                table: "Costs");

            migrationBuilder.DropForeignKey(
                name: "FK_Costs_AspNetUsers_ModifiedBy",
                table: "Costs");

            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_CreatedBy",
                table: "Countries");

            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_ModifiedBy",
                table: "Countries");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_CreatedBy",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_ModifiedBy",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedBy",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedBy",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonProducts_AspNetUsers_CreatedBy",
                table: "PersonProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonProducts_AspNetUsers_ModifiedBy",
                table: "PersonProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_AspNetUsers_CreatedBy",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_AspNetUsers_ModifiedBy",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_CreatedBy",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_ModifiedBy",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrders_AspNetUsers_CreatedBy",
                table: "ProductOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrders_AspNetUsers_ModifiedBy",
                table: "ProductOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_CreatedBy",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_ModifiedBy",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Products",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Products",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ModifiedBy",
                table: "Products",
                newName: "IX_Products_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Products_CreatedBy",
                table: "Products",
                newName: "IX_Products_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "ProductOrders",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "ProductOrders",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOrders_ModifiedBy",
                table: "ProductOrders",
                newName: "IX_ProductOrders_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOrders_CreatedBy",
                table: "ProductOrders",
                newName: "IX_ProductOrders_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Photos",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Photos",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Photos_ModifiedBy",
                table: "Photos",
                newName: "IX_Photos_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Photos_CreatedBy",
                table: "Photos",
                newName: "IX_Photos_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Persons",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Persons",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Persons_ModifiedBy",
                table: "Persons",
                newName: "IX_Persons_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Persons_CreatedBy",
                table: "Persons",
                newName: "IX_Persons_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "PersonProducts",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "PersonProducts",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_PersonProducts_ModifiedBy",
                table: "PersonProducts",
                newName: "IX_PersonProducts_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_PersonProducts_CreatedBy",
                table: "PersonProducts",
                newName: "IX_PersonProducts_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Payment",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Payment",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_ModifiedBy",
                table: "Payment",
                newName: "IX_Payment_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_CreatedBy",
                table: "Payment",
                newName: "IX_Payment_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Orders",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Orders",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_ModifiedBy",
                table: "Orders",
                newName: "IX_Orders_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CreatedBy",
                table: "Orders",
                newName: "IX_Orders_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Countries",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Countries",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_ModifiedBy",
                table: "Countries",
                newName: "IX_Countries_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_CreatedBy",
                table: "Countries",
                newName: "IX_Countries_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Costs",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Costs",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Costs_ModifiedBy",
                table: "Costs",
                newName: "IX_Costs_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Costs_CreatedBy",
                table: "Costs",
                newName: "IX_Costs_CreatedById");

            migrationBuilder.RenameColumn(
                name: "ModifiedBy",
                table: "Categories",
                newName: "ModifiedById");

            migrationBuilder.RenameColumn(
                name: "CreatedBy",
                table: "Categories",
                newName: "CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_ModifiedBy",
                table: "Categories",
                newName: "IX_Categories_ModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_CreatedBy",
                table: "Categories",
                newName: "IX_Categories_CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_CreatedById",
                table: "Categories",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_ModifiedById",
                table: "Categories",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_AspNetUsers_CreatedById",
                table: "Costs",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_AspNetUsers_ModifiedById",
                table: "Costs",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_CreatedById",
                table: "Countries",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_ModifiedById",
                table: "Countries",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_CreatedById",
                table: "Orders",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_ModifiedById",
                table: "Orders",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedById",
                table: "Payment",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedById",
                table: "Payment",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonProducts_AspNetUsers_CreatedById",
                table: "PersonProducts",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonProducts_AspNetUsers_ModifiedById",
                table: "PersonProducts",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_AspNetUsers_CreatedById",
                table: "Persons",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_AspNetUsers_ModifiedById",
                table: "Persons",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_CreatedById",
                table: "Photos",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_ModifiedById",
                table: "Photos",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrders_AspNetUsers_CreatedById",
                table: "ProductOrders",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrders_AspNetUsers_ModifiedById",
                table: "ProductOrders",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_CreatedById",
                table: "Products",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_ModifiedById",
                table: "Products",
                column: "ModifiedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_CreatedById",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_ModifiedById",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Costs_AspNetUsers_CreatedById",
                table: "Costs");

            migrationBuilder.DropForeignKey(
                name: "FK_Costs_AspNetUsers_ModifiedById",
                table: "Costs");

            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_CreatedById",
                table: "Countries");

            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_ModifiedById",
                table: "Countries");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_CreatedById",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_ModifiedById",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedById",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedById",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonProducts_AspNetUsers_CreatedById",
                table: "PersonProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonProducts_AspNetUsers_ModifiedById",
                table: "PersonProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_AspNetUsers_CreatedById",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Persons_AspNetUsers_ModifiedById",
                table: "Persons");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_CreatedById",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AspNetUsers_ModifiedById",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrders_AspNetUsers_CreatedById",
                table: "ProductOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrders_AspNetUsers_ModifiedById",
                table: "ProductOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_CreatedById",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_AspNetUsers_ModifiedById",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Products",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Products",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ModifiedById",
                table: "Products",
                newName: "IX_Products_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Products_CreatedById",
                table: "Products",
                newName: "IX_Products_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "ProductOrders",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "ProductOrders",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOrders_ModifiedById",
                table: "ProductOrders",
                newName: "IX_ProductOrders_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_ProductOrders_CreatedById",
                table: "ProductOrders",
                newName: "IX_ProductOrders_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Photos",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Photos",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Photos_ModifiedById",
                table: "Photos",
                newName: "IX_Photos_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Photos_CreatedById",
                table: "Photos",
                newName: "IX_Photos_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Persons",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Persons",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Persons_ModifiedById",
                table: "Persons",
                newName: "IX_Persons_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Persons_CreatedById",
                table: "Persons",
                newName: "IX_Persons_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "PersonProducts",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "PersonProducts",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_PersonProducts_ModifiedById",
                table: "PersonProducts",
                newName: "IX_PersonProducts_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_PersonProducts_CreatedById",
                table: "PersonProducts",
                newName: "IX_PersonProducts_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Payment",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Payment",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_ModifiedById",
                table: "Payment",
                newName: "IX_Payment_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Payment_CreatedById",
                table: "Payment",
                newName: "IX_Payment_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Orders",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Orders",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_ModifiedById",
                table: "Orders",
                newName: "IX_Orders_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CreatedById",
                table: "Orders",
                newName: "IX_Orders_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Countries",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Countries",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_ModifiedById",
                table: "Countries",
                newName: "IX_Countries_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_CreatedById",
                table: "Countries",
                newName: "IX_Countries_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Costs",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Costs",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Costs_ModifiedById",
                table: "Costs",
                newName: "IX_Costs_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Costs_CreatedById",
                table: "Costs",
                newName: "IX_Costs_CreatedBy");

            migrationBuilder.RenameColumn(
                name: "ModifiedById",
                table: "Categories",
                newName: "ModifiedBy");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Categories",
                newName: "CreatedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_ModifiedById",
                table: "Categories",
                newName: "IX_Categories_ModifiedBy");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_CreatedById",
                table: "Categories",
                newName: "IX_Categories_CreatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_CreatedBy",
                table: "Categories",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_ModifiedBy",
                table: "Categories",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_AspNetUsers_CreatedBy",
                table: "Costs",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Costs_AspNetUsers_ModifiedBy",
                table: "Costs",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_CreatedBy",
                table: "Countries",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_ModifiedBy",
                table: "Countries",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_CreatedBy",
                table: "Orders",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_ModifiedBy",
                table: "Orders",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_CreatedBy",
                table: "Payment",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_AspNetUsers_ModifiedBy",
                table: "Payment",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonProducts_AspNetUsers_CreatedBy",
                table: "PersonProducts",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonProducts_AspNetUsers_ModifiedBy",
                table: "PersonProducts",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_AspNetUsers_CreatedBy",
                table: "Persons",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_AspNetUsers_ModifiedBy",
                table: "Persons",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_CreatedBy",
                table: "Photos",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AspNetUsers_ModifiedBy",
                table: "Photos",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrders_AspNetUsers_CreatedBy",
                table: "ProductOrders",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrders_AspNetUsers_ModifiedBy",
                table: "ProductOrders",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_CreatedBy",
                table: "Products",
                column: "CreatedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_AspNetUsers_ModifiedBy",
                table: "Products",
                column: "ModifiedBy",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
