import { render,fireEvent, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import Comment from "../Comment"
import userFixtures from "../../../helpers/fixtures/user";
import { faker } from "@faker-js/faker";
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