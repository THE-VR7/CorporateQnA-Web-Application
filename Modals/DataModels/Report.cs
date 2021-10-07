using PetaPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.DataModels
{
    [TableName("Reports")]
    [PrimaryKey("Id", AutoIncrement = true)]
    public class Report
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
        public bool IsReported { get; set; }
    }
}
