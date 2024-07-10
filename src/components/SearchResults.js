import './SearchResults.css';
import React, { useEffect, useState } from 'react';
import { List, Skeleton} from 'antd';

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name`;

function SearchResults({childMenuLevel, onChange, showMoreButton = false, title }) {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData(){
            try {
                await fetch(fakeDataUrl)
                    .then((res) => res.json())
                    .then((res) => {
                        setInitLoading(false);
                        setData(res.results);
                        setList(res.results);
                    });
            } catch (err) {
                console.error('--- Error loading fake data ---', err);
            }
        }
        fetchData();
    }, []);

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                loading: true,
                name: {},
                picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
    };

    const loadMore =
        !initLoading && !loading && showMoreButton ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a className='ps-search-results__section__more'
               onClick={onLoadMore}>More</a>
        ) : null;

    const itemClicked = (item) => {
        // step into the child element
        console.log('Item clicked', item.name?.first);
        console.log('Level clicked', childMenuLevel);

        onChange(childMenuLevel);
    }

    return (
        <List
            size="small"
            header={<div>{title}</div>}
            className="ps-search-results__section"
            loading={initLoading}
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <List.Item onClick={() => itemClicked(item)}>
                    <Skeleton title={false} loading={item.loading} active>
                        <List.Item.Meta
                            // title={<a href="https://ant.design">{item.name?.last}</a>}
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            description={<a>{`${item.name?.last} ${item.name?.first}`}</a>}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}

export default SearchResults;