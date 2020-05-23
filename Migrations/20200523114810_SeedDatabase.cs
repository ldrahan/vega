using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make1');");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make2');");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId ) VALUES('Make1-Model1', (SELECT [Id] FROM [Makes] WHERE Name = 'Make1'));");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId ) VALUES('Make1-Model2', (SELECT [Id] FROM [Makes] WHERE Name = 'Make1'));");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId ) VALUES('Make2-Model1', (SELECT [Id] FROM [Makes] WHERE Name = 'Make2'));");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId ) VALUES('Make2-Model2', (SELECT [Id] FROM [Makes] WHERE Name = 'Make2'));");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN ('Make1', 'Make2');");
        }
    }
}
