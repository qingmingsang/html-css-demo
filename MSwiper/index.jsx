import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';
import './style.css';

export default class SwiperBiz extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,//独立id
        onSlideChange: PropTypes.func,//滑动回调函数
    }
    componentDidMount() {
        this.initSwiper();
    }
    componentDidUpdate() {
        this.initSwiper();
    }
    componentWillUnmount() {
        this._swiper && this._swiper.destroy();
    }
    render() {
        //样式自己通过id层级改写css
        //注意children里如果有空格也会被分割
        const { id, children } = this.props;
        return (
            <div
                id={id}
                className="swiper-container"
                ref={(x) => this._container = x}
            >
                <div className="swiper-wrapper">
                    {
                        children.map((node, key) => {
                            return (
                                <div
                                    key={key}
                                    className="swiper-slide"
                                >
                                    {node}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    initSwiper = () => {
        if (this._swiper) {
            this._swiper.update();
        } else {
            if (this._container) {
                const { onSlideChange } = this.props;
                let callback = {};
                if (onSlideChange) {
                    callback = {
                        on: {
                            slideChange: function () {
                                onSlideChange(this.activeIndex);
                            },
                        },
                    }
                }
                this._swiper = new Swiper(this._container, callback);
            }
        }
    }
}