import work from "../../../public/work.jpg";
const HowWork = () => {
  return (
    <div className="">
        <h1 className="text-4xl font-bold text-center my-20 lg:my-44">Empowering User Engagement and Ensuring Quality</h1>
    <div className="grid grid-cols-1  lg:flex p-3">
      <div className="">
        <ul className="space-y-4 stayCool ">
          <li>
            <strong>1. Features :</strong>
            <p>
              <span className="font-bold">*</span>User-friendly survey creation
              tools
            </p>
            <p>
              <span className="font-bold">*</span>Customizable survey templates
            </p>
            <p>
              <span className="font-bold">*</span>Real-time analytics and
              reporting
            </p>
            <p>
              <span className="font-bold">*</span>Pro user benefits like
              advanced commenting and insights
            </p>
          </li>
          <li>
            <strong>2. Survey Creation Page:</strong>

            <p>
              {" "}
              <span className="font-bold">Instructions::</span> So, easy selec a
              category and give title and the description about the survey and
              give a deadline.
            </p>
            <p>
              <span className="font-bold">Form:</span> Fields to input survey
              title, questions, options, etc.
            </p>
            <p>
              <span className="font-bold"> Options:</span> Checkbox for pro-user
              features like advanced analytics.
            </p>
            <p>
              <span className="font-bold">Call-to-Action:</span> "Publish
              Survey" button to make the survey live.
            </p>
          </li>
          <li>
            <strong>3. Survey Participation Page:</strong>
            <p>
              <span className="font-bold">Featured Surveys:</span> Display
              popular or recent surveys.
            </p>
            <p>
              <span className="font-bold">Search and Filter:</span> Tools to
              find surveys by category, keyword, etc.
            </p>
            <p>
              <span className="font-bold">Participation Section:</span> Option
              to take surveys with a brief description of each.
            </p>
            <p>Pro Features: Explanation of benefits for upgrading to pro.</p>
            <p>
              <span className="font-bold">Call-to-Action:</span> "Join Now"
              button leading to the sign-up page.
            </p>
          </li>
          <li>
            <strong>4. Survey Analytics Page:</strong>

            <p>
              {" "}
              <span className="font-bold">Reports:Graphs and Charts:</span>{" "}
              Visual representations of survey data.
            </p>
            <p>
              <span className="font-bold"> Filters:</span> Options to segment
              data by demographics, responses, etc.
            </p>
            <p>
              {" "}
              <span className="font-bold">Export:</span> Ability to download
              survey data for further analysis.
            </p>
            <p>
              <span className="font-bold">Recommendations:</span> Suggestions
              for improving future surveys based on insights.
            </p>
            <p>
              <span className="font-bold">Call-to-Action:</span> "Start
              Analyzing" button to dive into analytics.
            </p>
          </li>
          <li>
            <strong>5. Admin Dashboard:</strong>
            <p>
              <span className="font-bold">Survey List:</span> Overview of all
              surveys with options to edit, delete, or unpublish.
            </p>
            <p>
              <span className="font-bold">User Management:</span> Tools to
              manage user accounts, permissions, etc.
            </p>
            <p>
              <span className="font-bold">Reports: </span> Access to detailed
              analytics and user feedback.
            </p>
            <p>
              <span className="font-semibold">Notifications:</span> Alerts for
              new survey responses, comments, etc.
            </p>
            <p>
              <span className="font-bold"> Call-to-Action:</span> "Manage
              Surveys" button leading to the survey management page.
            </p>
          </li>

          <li>
            <strong>6. Pro User Features:</strong>
            <p>Pro-User can comment any survey.</p>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <img src={work} alt="" />
      </div>
    </div>
    </div>
  );
};

export default HowWork;
