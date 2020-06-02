using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Vega.Models
{
    [Owned]
    public class Contact
    {
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Phone { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
    }
}