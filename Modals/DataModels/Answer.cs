using PetaPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataModels
{
    [TableName("Answers")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class Answer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsBestSolution { get; set; }
        public string Description { get; set; }
    }
}
