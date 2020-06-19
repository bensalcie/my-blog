import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {markdownify, Link, safePrefix, classNames, getPages} from '../utils';

export default class Home extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
              {_.get(this.props, 'pageContext.frontmatter.has_intro') && 
              <div className="intro">
                <div className="inner-md">
                  {_.get(this.props, 'pageContext.frontmatter.intro_content') && 
                  <div className="intro-text">
                    {markdownify(_.get(this.props, 'pageContext.frontmatter.intro_content'))}
                  </div>
                  }
                  {_.get(this.props, 'pageContext.frontmatter.intro_actions') && 
                  <div className="intro-cta">
                    {_.map(_.get(this.props, 'pageContext.frontmatter.intro_actions'), (action, action_idx) => (
                    <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className={classNames({'button': (_.get(action, 'type') === 'primary') || (_.get(action, 'type') === 'secondary'), 'button-secondary': _.get(action, 'type') === 'secondary'})} {...(_.get(action, 'new_window') ? {target: '_blank', rel: 'noopener'} : null)}>{_.get(action, 'label')}</Link>
                    ))}
                  </div>
                  }
                </div>
              </div>
              }
              <div className="post-feed">
                {_.map(display_posts, (post, post_idx) => (
                <article key={post_idx} className="post post-card">
                  <div className="post-card-inside">
                    {_.get(post, 'frontmatter.thumb_img_path') && 
                    <Link className="post-card-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                      <img className="thumbnail" src={safePrefix(_.get(post, 'frontmatter.thumb_img_path'))} alt={_.get(post, 'frontmatter.title')} />
                    </Link>
                    }
                    <div className="post-card-content">
                      <header className="post-header">
                        <div className="post-meta">
                          <time className="published"
                          dateTime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
                        </div>
                        <h2 className="post-title"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{_.get(post, 'frontmatter.title')}</Link></h2>
                      </header>
                      <div className="post-excerpt">
                        {_.get(post, 'frontmatter.excerpt') && 
                        <p>{_.get(post, 'frontmatter.excerpt')}</p>
                        }
                        <p className="read-more">
                          <Link className="button button-secondary" to={safePrefix(_.get(post, 'url'))}>Read more</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
                ))}
              </div>
            </Layout>
        );
    }
}
