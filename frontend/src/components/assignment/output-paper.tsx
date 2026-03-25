"use client";

interface Question {
  question: string;
  answer: string;
  difficulty: string;
  marks: number;
  options?: string[]; // ✅ Added for MCQs
}

interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

interface OutputPaperProps {
  data: {
    sections: Section[];
  };
  jobId: string;
}

export default function OutputPaper({ data, jobId }: OutputPaperProps) {
  const difficultyColor: any = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="w-full flex justify-center bg-[#F4F4F4] py-10">
      <div className="w-full max-w-[800px] flex flex-col items-center">
        
        {/* AI Banner */}
        <div className="w-full bg-black text-white rounded-[12px] p-4 mb-6 flex justify-between items-center">
          <p className="text-[13px]">
            AI-generated question paper ready
          </p>

          <button
            onClick={() =>
              window.open(`http://localhost:5000/api/assignment/${jobId}/pdf`)
            }
            className="px-4 py-2 bg-white text-black rounded-[8px] text-[12px]"
          >
            Download PDF
          </button>
        </div>

        {/* Paper */}
        <div className="w-full bg-white px-12 py-10 rounded-[6px] shadow-md">
          
          {/* School Header */}
          <div className="text-center mb-8">
            <h1 className="text-[18px] font-semibold">
              Delhi Public School, Sector-4, Bokaro
            </h1>
            <p className="text-[13px] mt-1">Subject: English</p>
            <p className="text-[13px]">Class: 5th</p>
          </div>

          {/* Exam Info */}
          <div className="flex justify-between text-[13px] mb-4">
            <span>Time Allowed: 45 minutes</span>
            <span>Maximum Marks: 20</span>
          </div>

          <p className="text-[12px] mb-4">
            All questions are compulsory unless stated otherwise.
          </p>

          {/* Student Info */}
          <div className="flex justify-between text-[13px] mb-6">
            <div>Name: ____________________</div>
            <div>Roll Number: ____________________</div>
            <div>Section: ____________________</div>
          </div>

          {/* Sections */}
          {data.sections.map((section, index) => (
            <div key={index} className="mb-6">
              
              {/* Section Header */}
              <h2 className="text-[16px] font-semibold mb-1">
                {section.title}
              </h2>

              <p className="text-[12px] text-[#6B6B6B] mb-3">
                {section.instruction}
              </p>

              {/* Questions */}
              <div className="flex flex-col gap-4">
                {section.questions.map((q, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start gap-4"
                  >
                    
                    {/* LEFT */}
                    <div className="text-[13px] leading-relaxed flex gap-2">
                      <span className="font-medium">{i + 1}.</span>

                      <div className="flex flex-col gap-1">
                        {/* Question */}
                        <span>{q.question}</span>

                        {/* ✅ MCQ Options */}
                        {q.options && q.options.length > 0 && (
                          <div className="mt-1 flex flex-col gap-1 text-[12px] text-[#444]">
                            {q.options.map((opt: string, idx: number) => (
                              <span key={idx}>
                                {String.fromCharCode(65 + idx)}. {opt}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Difficulty Badge */}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full w-fit ${
                            difficultyColor[q.difficulty]
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="text-[12px] text-[#6B6B6B] whitespace-nowrap">
                      [{q.marks} Marks]
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <hr className="my-6 border-[#E5E5E5]" />
            </div>
          ))}

          {/* ✅ Answer Key */}
          <div className="mt-10">
            <h3 className="text-[14px] font-semibold mb-3">
              Answer Key
            </h3>

            <div className="flex flex-col gap-2">
              {data.sections.map((section, si) =>
                section.questions.map((q, qi) => (
                  <div key={`${si}-${qi}`} className="text-[12px]">
                    <span className="font-medium mr-2">
                      {qi + 1}.
                    </span>
                    {q.answer}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}