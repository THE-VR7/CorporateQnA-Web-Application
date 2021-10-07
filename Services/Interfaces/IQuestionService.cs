using Modals.CoreModals;
using Modals.DataModels;
using Modals.DataViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IQuestionService
    {
		Boolean AddQuestion(Question question);
		bool AddView(View view);
		List<QuestionDetailsView> GetQuestions();
		QuestionDetailsView GetQuestionViewById(int questionId);
		QuestionDetailsView UpvoteQuestion(Vote vote);
		Boolean ReportQuestion(Report report);
		bool AlterQuestionStatusById(Question question);
		QuestionProfile GetQuestionById(int questionId);
	}
}
