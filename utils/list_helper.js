const dummy = (blogs) => {
   return 1
  }
  
const allLikes =(blogs) => {
    return blogs.reduce((previous, current, index) => previous + current.likes,
    0)
}

const favoriteBlog = (blogs) => {
 return blogs.reduce((prev, current) => (prev.likes > current.likes ? prev : current))
 
}

const mostBlogs = (blogs) => {
  
    if (blogs.length === 1) {
      return {
        author: blogs[0].author,
        blogs: 1
      }
    } else {
      const authors = blogs.map((blog) => blog.author)
      const authorsWBlogs = authors.map((author) => {
        return ({
          author: author,
          blogs: blogs.filter((blog) => blog.author === author).length
        })
      })
      const sorted = authorsWBlogs.sort((a,b) => b.blogs - a.blogs)
      return sorted[0]
    }
  
}

const mostLikes = (blogs) => {
  
    if (blogs.length === 1) {
      return {
        author: blogs[0].author,
        likes: blogs[0].likes
      }
    } else {
      const authors = blogs.map((blog) => blog.author)
      const authorsWLikes = authors.map((author) => {
        return ({
          author: author,
          likes: blogs.filter((blog) => blog.author === author).map((blog) => blog.likes).reduce(function(a,b) {return a + b})
        })
      })
      const sorted = authorsWLikes.sort((a,b) => b.likes - a.likes)
      return sorted[0]
    }
  
}


  module.exports = {
    dummy,
    allLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }