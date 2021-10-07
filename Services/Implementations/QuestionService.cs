using Modals.CoreModals;
using Modals.DataModels;
using Modals.DataViewModels;
using PetaPoco;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Implementations
{
    public class QuestionService : IQuestionService
    {
        private readonly AutoMapper.IMapper Mapper;
        public Database Db { get; set; }
        public QuestionService(Database db, AutoMapper.IMapper mapper)
        {
            this.Db = db;
            this.Mapper = mapper;
        }

        public bool AddQuestion(Question question)
        {
            Db.Insert("Questions", "Id", question);
            return true;
        }

        public bool AddView(View view)
        {
            Db.Insert("Views", "Id", view);
            return true;
        }


        public QuestionProfile GetQuestionById(int questionId)
        {
            QuestionDetailsView questionDetailView = Db.Query<QuestionDetailsView>("Select * from QuestionDetailsView where Id = @questionId",new { questionId}).FirstOrDefault();
            var questionProfile = Mapper.Map<QuestionProfile>(questionDetailView);
            questionProfile.Answers = Db.Query<AnswerDetailsView>("Select * from AnswerDetailsView where QuestionId = @questionId", new { questionId }).ToList();
            return questionProfile;
        }

        public List<QuestionDetailsView> GetQuestions()
        {
            return Db.Query<QuestionDetailsView>("Select * from QuestionDetailsView ").ToList();
        }

        public QuestionDetailsView GetQuestionViewById(int questionId)
        {
            return Db.Query<QuestionDetailsView>("Select * from QuestionDetailsView where Id = @0", questionId).FirstOrDefault();
        }

        public bool ReportQuestion(Report report)
        {
            //Db.Query<Report>($"Select * from Reports where UserId = {report.UserId}", new { report.UserId }).FirstOrDefault();
            Db.Insert("Reports", "Id", report);
            return true;            
        }

        public QuestionDetailsView UpvoteQuestion(Vote vote)
        {
            var currVote = Db.FirstOrDefault<Vote>("Select * from Votes where UserId = @0 and QuestionId = @1 ", vote.UserId,vote.QuestionId);
            if(currVote == null)
            {
                Db.Insert("Votes", "Id", vote);
                return GetQuestionViewById(vote.QuestionId);
            }
            currVote.IsVoted = !currVote.IsVoted;
            Db.Update("Votes", "Id", currVote);
            return GetQuestionViewById(vote.QuestionId);
        }

        public bool AlterQuestionStatusById(Question question)
        {
            
            Db.Update("Questions", "Id", question);
            return true;
        }
    }
}
