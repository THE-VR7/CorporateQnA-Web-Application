using PetaPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataModels
{
    [TableName("Votes")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class Vote
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
        public bool IsVoted { get; set; }
    }
}
