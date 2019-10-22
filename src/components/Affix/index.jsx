import React, { Component,createRef } from 'react'
import styles from './index.module.scss'
export default class Affix extends Component {
    onScroll = ()=>{
        // console.log(this.placeHolderRef.current);
        console.log(this.placeHolderRef.current.getBoundingClientRect());
        const {top} =this.placeHolderRef.current.getBoundingClientRect()
        if(top <= 0) {
            this.placeHolderRef.current.style.height='50px'
            this.contentRef.current.classList.add(styles.fixed)
        }else {
            this.placeHolderRef.current.style.height = '0px'
            this.contentRef.current.classList.remove(styles.fixed)
        }
        
        
    }
    componentDidMount() {
        this.placeHolderRef = createRef()
        this.contentRef = createRef()
        window.addEventListener('scroll',this.onScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this.onScroll)
    }
    render() {
        return (
            <div>
                <div ref={this.placeHolderRef}></div>
                <div ref={this.contentRef}>{this.props.children}</div>
            </div>
        )
    }
}
