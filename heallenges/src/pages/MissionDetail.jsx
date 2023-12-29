import React from "react";
import { Link } from "react-router-dom";

function MissionDetail() {
  return (
    <main id="main">
      {/* <!-- ======= Breadcrumbs ======= --> */}
      <div className="breadcrumbs d-flex align-items-center" style={{ backgroundImage: "url('/images/blog-header.jpg');" }}>
        <div className="container position-relative d-flex flex-column align-items-center">
          <h2>미션 상세페이지</h2>
          <ol>
            <li>
              <Link to={"/mission"}>미션</Link>
            </li>
            <li>미션 상세</li>
          </ol>
        </div>
      </div>
      {/* <!-- End Breadcrumbs --> */}

      {/* <!-- ======= Blog Details Section ======= --> */}
      <section id="blog" className="blog">
        <div className="container" data-aos="fade-up">
          <div className="row g-5">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <article className="blog-details">
                <div className="post-img">
                  <img src="/imqges/blog/blog-1.jpg" alt="" className="img-fluid" />
                </div>

                <h2 className="title">Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia</h2>

                <div className="meta-top">
                  <ul>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-person"></i> <a href="blog-details.html">John Doe</a>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-clock"></i>{" "}
                      <a href="blog-details.html">
                        <time datetime="2020-01-01">Jan 1, 2022</time>
                      </a>
                    </li>
                    <li className="d-flex align-items-center">
                      <i className="bi bi-chat-dots"></i> <a href="blog-details.html">12 Comments</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- End meta top --> */}

                <div className="content">
                  <p>
                    Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem
                    aliquid dicta. Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta. Est cum et quod quos aut ut et sit sunt.
                    Voluptate porro consequatur assumenda perferendis dolore.
                  </p>

                  <p>
                    Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi in accusamus harum vel aspernatur. Excepturi numquam nihil
                    cumque odio. Et voluptate cupiditate.
                  </p>

                  <blockquote>
                    <p>Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi aut. Aut eos aliquam doloribus minus autem quos.</p>
                  </blockquote>

                  <p>
                    Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid. Id repellendus
                    quia. Asperiores nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores nihil quaerat. Dolor porro tempora et
                    quibusdam voluptas. Beatae aut at ad qui tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis neque.
                    Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error
                    rerum nihil tempora.
                  </p>

                  <h3>Et quae iure vel ut odit alias.</h3>
                  <p>
                    Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio provident dolores atque voluptatem rem
                    excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid
                    qui. Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet
                    dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed. Quibusdam rerum dolores sint
                    consequatur quidem ea. Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem
                    voluptatem accusamus mollitia aut atque aut.
                  </p>
                  <img src="assets/img/blog/blog-inside-post.jpg" className="img-fluid" alt="" />

                  <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                  <p>
                    Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero
                    sed occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt labore. Autem facilis hic dolorum dolores
                    vel. Consectetur quasi id et optio praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut
                    aut blanditiis. Veritatis numquam ut illum ut a quam vitae.
                  </p>
                  <p>
                    Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est
                    veniam.
                  </p>
                </div>
                {/* <!-- End post content --> */}

                <div className="meta-bottom">
                  <i className="bi bi-folder"></i>
                  <ul className="cats">
                    <li>
                      <a href="#">Business</a>
                    </li>
                  </ul>

                  <i className="bi bi-tags"></i>
                  <ul className="tags">
                    <li>
                      <a href="#">Creative</a>
                    </li>
                    <li>
                      <a href="#">Tips</a>
                    </li>
                    <li>
                      <a href="#">Marketing</a>
                    </li>
                  </ul>
                </div>
                {/* <!-- End meta bottom --> */}
              </article>
              {/* <!-- End blog post --> */}

              {/* <!-- End post author --> */}

              <div className="comments">
                <h4 className="comments-count">8 Comments</h4>

                <div id="comment-1" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="assets/img/blog/comments-1.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Georgia Reader</a>{" "}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta. Vero aut
                        rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- End comment #1 --> */}

                <div id="comment-2" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="/images/blog/comments-2.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Aron Alvarado</a>{" "}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>Ipsam tempora sequi voluptatem quis sapiente non. Autem itaque eveniet saepe. Officiis illo ut beatae.</p>
                    </div>
                  </div>

                  <div id="comment-reply-1" className="comment comment-reply">
                    <div className="d-flex">
                      <div className="comment-img">
                        <img src="/images/blog/comments-3.jpg" alt="" />
                      </div>
                      <div>
                        <h5>
                          <a href="">Lynda Small</a>{" "}
                          <a href="#" className="reply">
                            <i className="bi bi-reply-fill"></i> Reply
                          </a>
                        </h5>
                        <time datetime="2020-01-01">01 Jan,2022</time>
                        <p>
                          Enim ipsa eum fugiat fuga repellat. Commodi quo quo dicta. Est ullam aspernatur ut vitae quia mollitia id non. Qui ad quas nostrum
                          rerum sed necessitatibus aut est. Eum officiis sed repellat maxime vero nisi natus. Amet nesciunt nesciunt qui illum omnis est et
                          dolor recusandae. Recusandae sit ad aut impedit et. Ipsa labore dolor impedit et natus in porro aut. Magnam qui cum. Illo similique
                          occaecati nihil modi eligendi. Pariatur distinctio labore omnis incidunt et illum. Expedita et dignissimos distinctio laborum minima
                          fugiat. Libero corporis qui. Nam illo odio beatae enim ducimus. Harum reiciendis error dolorum non autem quisquam vero rerum neque.
                        </p>
                      </div>
                    </div>

                    <div id="comment-reply-2" className="comment comment-reply">
                      <div className="d-flex">
                        <div className="comment-img">
                          <img src="/images/blog/comments-4.jpg" alt="" />
                        </div>
                        <div>
                          <h5>
                            <a href="">Sianna Ramsay</a>{" "}
                            <a href="#" className="reply">
                              <i className="bi bi-reply-fill"></i> Reply
                            </a>
                          </h5>
                          <time datetime="2020-01-01">01 Jan,2022</time>
                          <p>
                            Et dignissimos impedit nulla et quo distinctio ex nemo. Omnis quia dolores cupiditate et. Ut unde qui eligendi sapiente omnis ullam.
                            Placeat porro est commodi est officiis voluptas repellat quisquam possimus. Perferendis id consectetur necessitatibus.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End comment reply #2--> */}
                  </div>
                  {/* <!-- End comment reply #1--> */}
                </div>
                {/* <!-- End comment #2--> */}

                <div id="comment-3" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="/images/blog/comments-5.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Nolan Davidson</a>{" "}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor
                        exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at. Non aut et et esse qui sit modi neque. Exercitationem et eos
                        aspernatur. Ea est consequuntur officia beatae ea aut eos soluta. Non qui dolorum voluptatibus et optio veniam. Quam officia sit nostrum
                        dolorem.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- End comment #3 --> */}

                <div id="comment-4" className="comment">
                  <div className="d-flex">
                    <div className="comment-img">
                      <img src="/images/blog/comments-6.jpg" alt="" />
                    </div>
                    <div>
                      <h5>
                        <a href="">Kay Duggan</a>{" "}
                        <a href="#" className="reply">
                          <i className="bi bi-reply-fill"></i> Reply
                        </a>
                      </h5>
                      <time datetime="2020-01-01">01 Jan,2022</time>
                      <p>
                        Dolorem atque aut. Omnis doloremque blanditiis quia eum porro quis ut velit tempore. Cumque sed quia ut maxime. Est ad aut cum. Ut
                        exercitationem non in fugiat.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- End comment #4 --> */}

                <div className="reply-form">
                  <h4>Leave a Reply</h4>
                  <p>Your email address will not be published. Required fields are marked * </p>
                  <form action="">
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <input name="name" type="text" className="form-control" placeholder="Your Name*" />
                      </div>
                      <div className="col-md-6 form-group">
                        <input name="email" type="text" className="form-control" placeholder="Your Email*" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col form-group">
                        <input name="website" type="text" className="form-control" placeholder="Your Website" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col form-group">
                        <textarea name="comment" className="form-control" placeholder="Your Comment*"></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
              {/* \<!-- End blog comments --> */}
            </div>
          </div>
          {/* <!-- End Blog Sidebar --> */}
        </div>
      </section>
      {/* <!-- End Blog Details Section --> */}
    </main>
  );
  {
    /* <!-- End #main -->; */
  }
}

export default MissionDetail;
