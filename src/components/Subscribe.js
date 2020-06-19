import React from 'react';
import _ from 'lodash';

import {htmlToReact} from '../utils';
import SubscribeForm from './SubscribeForm';

export default class Subscribe extends React.Component {
    render() {
        return (
            <section className="subscribe outer">
              <div className="inner-sm">
                {_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_title') && 
                <h2 className="subscribe-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_title')}</h2>
                }
                {_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content') && 
                <p className="subscribe-text">
                  {htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content'))}
                </p>
                }
                <SubscribeForm {...this.props} />
              </div>
            </section>
        );
    }
}
