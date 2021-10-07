using Modals.DataModels;
using Modals.DataViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.CoreModals
{
    public class QuestionProfile
    {

        public int Id { get; set; }
        public int Views { get; set; }
        public DateTime CreatedOn { get; set; }
        public int Votes { get; set; }
        public int NumberOfAnswers { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public UserDetailsView User { get; set; }
        public bool IsSolved { get; set; }
        public Category Category { get; set; }
        public List<AnswerDetailsView> Answers { get; set; }
    }
}
