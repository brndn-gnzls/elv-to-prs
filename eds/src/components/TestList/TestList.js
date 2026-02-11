import React from 'react';
import { useQuery, gql } from "@apollo/client";
// Remove or comment out: import './TestList.module.css';

const GET_TESTITEMS = gql`
    query GetTestItems {
        testItems {
            Title
            Description
            Image {
                url
            }
        }
    }
`;

const TestList = () => {
    const STR_URL = process.env.REACT_APP_STRAPI_BASE;

    const { loading, error, data } = useQuery(GET_TESTITEMS, {
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const items = data?.testItems || [];

    return (
    <ul className="grid small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 gap-6">
        {items.map((item, idx) => (
            <li
                key={idx}
                className="bg-white p-4 rounded shadow"
            >
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">{item.Title}</h3>

                {/* Description - assume it's rich text array, like your ArticleList. */}
                {item.Description.map((block, blockIdx) => (
                    <div key={blockIdx} className="mb-2">
                        {block.children.map((child, childIdx) => (
                            <p key={childIdx}>{child.text}</p>
                        ))}
                    </div>
                ))}

                {/* Image - assume an array of media objects */}
                {item.Image && item.Image.length > 0 && (
                    <img
                        src={`${STR_URL}${item.Image[0].url}`}
                        alt={item.Title}
                        className="w-full h-auto rounded"
                    />
                )}
            </li>
        ))}
    </ul>
);
};

export default TestList;
