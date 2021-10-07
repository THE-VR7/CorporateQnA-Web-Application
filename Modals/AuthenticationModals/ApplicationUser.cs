using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modals.AuthenticationModals
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "varchar(MAX)")]
        public string Designation { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string ImageUrl { get; set; }



    }
}
