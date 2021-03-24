import React from "react";
import Article from "./article-component"

export default class extends React.Component
{
    constructor( obj )
    {
        super(obj);
    }

    render()
    {
        console.log(this.props.articles, "2");

        return this.props.articles.map( (item, i) => {
            console.log(item, "1");
            return <Article 
                    onDelete={ ()=> { this.props.onDelete(i) } } 
                    key={i} 
                    title={item.model} 
                    body={item.company} 
                    openEditModal={ ()=> { this.props.openEditModal(i) } }
                    />
        } );
    }
}