function FileUploader() {
  return (
    <>
      <form action="#">
        <p>Browse FIle to Upload</p>
      </form>
      <section className="progress-area">
        <li className="row">
          <i className="fas fa-file-alt"></i>
          <div className="content">
            <div className="details">
              <span className="name">image_01.png - Uploding</span>
              <span className="percent">50%</span>
            </div>
            <div className="progreess-bar">
              <div className="progress"></div>
            </div>
          </div>
        </li>
      </section>
      <section className="uploaded-area">
        <li className="row">
          <div className="content">
            <i className="fas fa-file-alt"></i>
            <div className="details">
              <span className="name">image_01.png - Uploded</span>
              <span className="percent">70kb</span>
            </div>
          </div>
        </li>
      </section>
    </>
  );
}
export default FileUploader;
