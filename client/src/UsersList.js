import React, { useState } from 'react'
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`
const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`

export default function UsersList () {
  const [movieSearch, setMovieSearch] = useState('')

  // Create User states
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [nationality, setNationality] = useState('')

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS)
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
  const [
    fetchMovie,
    { data: movieSearchData, error: movieError }
  ] = useLazyQuery(GET_MOVIE_BY_NAME)

  const [createUser] = useMutation(CREATE_USER_MUTATION)

  if (error) console.log(error)

  if (loading) <h1>Data is loading...</h1>

  // if (data) console.log(data)
  if (movieSearchData) console.log('movieSearchData', movieSearchData)
  if (movieError) console.log('No movie found')

  return (
    <div>
      <div className='bg-gray-50'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            <span className='block'>Ready to dive in?</span>
            <span className='block text-indigo-600'>
              Start your Apollo Server/Client integration Today.
            </span>
          </h2>
          <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
            <div className='inline-flex rounded-md shadow'>
              <a
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
              >
                Get started
              </a>
            </div>
            <div className='ml-3 inline-flex rounded-md shadow'>
              <a
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50'
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <input
          type='text'
          placeholder='Name...'
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Username...'
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='number'
          placeholder='Age...'
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          onChange={e => setAge(e.target.value)}
        />
        <input
          type='text'
          placeholder='Nationality...'
          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          onChange={e => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality }
              }
            })
            refetch()
          }}
          className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Create User
        </button>
      </div>

      <div>
        {data &&
          data.users.map(user => {
            return (
              <div key={user.name}>
                <ul role='list' className='p-6 divide-y divide-slate-200'>
                  <li className='flex py-4 first:pt-0 last:pb-0'>
                    <div className='ml-3 overflow-hidden'>
                      <p className='text-sm font-medium text-slate-900'>
                        Name: {user.name}
                      </p>
                      <p className='text-sm text-slate-500 truncate'>
                        Username: {user.username}
                      </p>
                      <p className='text-sm text-slate-500 truncate'>
                        Nationality: {user.nationality}
                      </p>
                      <p className='text-sm text-slate-500 truncate'>
                        Age: {user.age}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            )
          })}

        {movieData &&
          movieData.movies.map(movie => {
            return <h1 key={movie.name}>Movie Name: {movie.name}</h1>
          })}
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Search The Movie
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Yoy may search the movie through
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <div className='shadow overflow-hidden sm:rounded-md'>
              <div className='px-4 py-5 bg-white sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6'>
                    <label
                      htmlFor='street-address'
                      className='block text-sm font-medium text-gray-700'
                      // onChange={e => {
                      //   setMovieSearch(e.target.value)
                      // }}
                    >
                      Search the Movie
                    </label>
                    <input
                      type='text'
                      id='street-address'
                      placeholder='movie...'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      onChange={event => setMovieSearch(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    onClick={() =>
                      fetchMovie({
                        variables: {
                          name: movieSearch
                        }
                      })
                    }
                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Fetch Data
                  </button>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                {/* <button
                  onClick={() =>
                    fetchMovie({
                      variables: {
                        name: movieSearch
                      }
                    })
                  }
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Fetch Data
                </button> */}
              </div>
              <div>
                {movieSearchData && (
                  <div>
                    <h1>Movie Name: {movieSearchData.movie.name}</h1>
                  </div>
                )}
                {movieError && <h1>There was an error to fetch the movie</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
