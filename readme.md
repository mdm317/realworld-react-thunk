# gothinker 프로젝트
백엔드 html태그 css gochinker 제공   
gothinker 깃헙 : https://github.com/gothinkster/realworld/tree/master/spec   


# 사용 
typescript + react + redux


# 페이지 기능
* layout
    + home newpost setting login logout signup 등으로 이동할수 있는 탭이 있음
    + 로그인 여부에 따라 탭이 다르게 보여야한다.
    + 토큰 값으로 현재 로그인된 유저 얻어옴
* home
    + 5개의 article들을 보여줌
    + 로그인시 내 article 만 볼수 있는 탭이 있어야함
    + myarticle 을 누를시 내 글이 보여야 한다.
* addPost
    + 중복된 태그는 등록되지 않아야한다.
    + 토큰이 잘못되었을시 로그인 하라는 알람이 보여야한다.
    + 등록성공시 등록성공 알람이 보여지고 홈으로 이동해야한다.
* login
    + 로그인 실패시 실패 메시지를 화면에 표시해야함
    + 성공시 홈으로 이동
* profile
    + 사용자 정보가 보인다.
    + 그 사용자가 쓴 글이 보여야한다.
    + 그 사용자가 좋아하는 글이 보여야한다. 
* settingUser
    + 폼으로 사용자 정보를 수정할 수 있어야한다.
* signup
    + 회원가입 실패 이유를 화면에 표시해야한다.
    + 회원가입 성공시 로그인 페이지로 으로 이동
* articleDetail
    + 글의 제목과 내용이 보여야한다
    + 내글일 경우 삭제와 수정을 할 수 있어야한다.
    + 다른 사람일 경우 팔로우와 좋아요를 할수 있어야 한다.
    + tag list 가 있어야 한다.
    + 댓글 창이 있어야한다.
    + 로그인시 댓글을 작성할수 있어야한다.
* editArticle
    + 내가 쓴글을 수정할 수 있어야한다.

# 컴포넌트 구조
- ArticleDetail
    - ArticleMyCard / ArticleOthersCard => follow,favorite 이거나 edit delete 기능
    - CommentBox => 댓글입력 
- Home
    - ArticleBoxGlobal / ArticleBoxUserFavorite / ArticleBoxUserFeed  => article 표현
        - ArticleList
            - UserMeta => articlepreview 에서 favorite 기능 포함
            - Pagenation
    - tagList => tag를 클릭하면 history 에 반영