using PetaPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataModels
{
    [TableName("Views")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class View
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
