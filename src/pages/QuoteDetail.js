import React, { Fragment, useEffect } from 'react'
import { Route, useParams,Link,useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments';
import HighlightedQuote from './../components/quotes/HighlightedQuote'
import useHttp from '../components/hooks/use-http';
import { getSingleQuote } from '../components/lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';


const QuoteDetail = () => {
    const params=useParams();
    const match=useRouteMatch();
    const {quoteId}=params
    const {sendRequest,status,data:loadedQuote,error}=useHttp(getSingleQuote,true);
    useEffect(()=>{
      console.log('status',quoteId)
      sendRequest(quoteId);
    },[sendRequest,quoteId])
    // const quote= DUMMY_QUOTES.find(quote=> quote.id === params.quoteId)
    if(status=== "pending"){
      return <div className='centered'>
        <LoadingSpinner/>
      </div>
    }
    if(error){
      return <p className='centered'>{error}</p>
    }
    console.log('loadedQuote',loadedQuote)
    if(!loadedQuote.text){
      return <p>No quote found</p>
    }
  return (
    <Fragment>
<HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
<Route path={`${match.path}`} exact>

<div className='centered'>

<Link className='btn--flat' to={`/quotes/${quoteId}/comments`} >Load Comments</Link>
</div>
</Route>
    <Route path={`${match.path}/comments`} >
    {/* <Route path={`/quotes/:quoteId/comments`}> */}

<Comments />
    </Route>
    </Fragment>
  )
}

export default QuoteDetail