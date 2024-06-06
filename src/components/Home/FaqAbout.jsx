import ques from "../../../public/ques.jpg";
const FaqAbout = () => {
  return (
    <div className="">
      <h2 className="text-3xl lg:text-6xl text-center font-bold my-20 lg:my-44">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 lg:flex w-full">
        <div className="lg:w-2/4">
          <img src={ques} alt="FAQ" className="w-full" />
        </div>
        <div className="lg:w-2/4">
          <div className="flex flex-col space-y-4">
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-lg font-medium">
                Who can create survey & Is that survey can update ? 
              </div>
              <div className="collapse-content">
                <p>Surveyor can create surveys.Yes survey can update. A surveyor can see how many poeple participate on his survey and thier information can see a surveyor</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                Is that users can participate and can they report the survey if it need be?
              </div>
              <div className="collapse-content">
                <p>Yes. A user can participate a survey and if any problem they can report that survey but only pro-user can post a comment</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                Can i vote here if the deadline in gone ?
              </div>
              <div className="collapse-content">
                <p>Sorry, You can't participate or vote the survey if it's deadline is over.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                Is that admin can unpublish a survey?
              </div>
              <div className="collapse-content">
                <p>Yes, He can unpublish a survey but he need to give a feedback why</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-lg font-medium">
                Is that any one can create survey ?
              </div>
              <div className="collapse-content">
                <p>No, Only surveyor can create survey.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAbout;
