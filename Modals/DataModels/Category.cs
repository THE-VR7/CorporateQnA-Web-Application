using PetaPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataModels
{
    [TableName("Category")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
