import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {safePrefix} from '../utils';
import Header from './Header';
import Subscribe from './Subscribe';
import Footer from './Footer';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' - '}{_.get(this.props, 'pageContext.site.siteMetadata.title')}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.excerpt') || _.get(this.props, 'pageContext.site.siteMetadata.description')}/>
                    <link href="https://fonts.googleapis.com/css?family=PT+Serif:400,700%7CRoboto:400,400i,700,700i&display=swap" rel="stylesheet"/> 
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
                    {(_.get(this.props, 'pageContext.frontmatter.template') === 'post') &&  
                    _.get(this.props, 'pageContext.frontmatter.canonical_url') && 
                    <link rel="canonical" href={_.get(this.props, 'pageContext.frontmatter.canonical_url')}/>
                    }
                </Helmet>
                  <div id="page" className={'site layout-' + _.get(this.props, 'pageContext.site.siteMetadata.layout_style') + ' palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette')}>
                    <Header {...this.props} />
                    <div id="content" className="site-content outer">
                      <main id="main" className="site-main inner">
                        {this.props.children}
                      </main>
                    </div>
                    {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_subscribe') && 
                      <Subscribe {...this.props} />
                    }
                    <Footer {...this.props} />
                  </div>
            </React.Fragment>
        );
    }
}
