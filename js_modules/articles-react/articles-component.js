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
        return this.props.articles.map( (item, i) => {
            console.log(item, "1");
            return <Article 
                    onDelete={ ()=> { this.props.onDelete(i) } } 
                    key={i} 
                    title={item.Model} 
                    body={item.Company} 
                    openEditModal={ ()=> { this.props.openEditModal(i) } }
                    />
        } );
    }
}