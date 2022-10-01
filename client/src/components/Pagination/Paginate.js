import React from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts} from "../../actions/actions";
import useStyles from './styles';


const Paginate = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const {totalPage} = useSelector(state => state.posts? state.posts : 1);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(getPosts(page));
  }, [page])

  const handleChange = (e, value) => {
    setPage(value);
  }

  return (
    <Pagination onChange={handleChange} className={classes.ul} page={Number(page)||1} count={totalPage} variant="outlined" color='primary' renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}/>
  );
};

export default Paginate;
