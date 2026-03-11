 function Question(prop)
{
    return(
        <div className='text-blue-900 font-mono font-bold text-center mt-3 mb-2 ml-10 mr-10 text-2xl'>Q{prop.index}/{prop.noOfQuestions}) {prop.children}</div>
    )
}
export {Question}