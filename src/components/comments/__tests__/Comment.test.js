import { render, screen } from "../../../helpers/test-utils";
import Comment from "../Comment"
import userFixtures from "../../../helpers/fixtures/user";
import commentFixtures from "../../../helpers/fixtures/comment"



const userData = userFixtures()


const commentData = commentFixtures(true, false, userData)


beforeEach(() => {
    localStorage.clear()

    jest.clearAllMocks()
})


test("render the comment componet", () => {
    render( < Comment comment={commentData}/>)

    const commentElement = screen.getByTestId('comment-test')
    expect(commentElement).toBeInTheDocument()
})