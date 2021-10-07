using PetaPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataModels
{
    [TableName("Questions")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class Question
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsSolved { get; set; }
        public string Description { get; set; }
        public string Headline { get; set; }
    }
}
