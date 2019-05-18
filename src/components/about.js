import React, { Component } from 'react';
import Header from './header';
import {ContactNumber} from '../strings'

const paragraphStyle = {
	textAlign : 'center'
}

class AboutPage extends Component {

  	render() {
  		return (
  		 	<div id="page" className="site">
	        	<Header/>
	        	<div id="about-content" class="site-content">
					<id id="primary" class="content-area">
						<main id="main" class="site-main">
							<article class="page type-page has-post-thumbnail hentry">
								<div class="entry-content">
									<div class="container">
										<table class="values-table">
											<tbody>
												<tr>
													<th class="about-values-title" style={paragraphStyle} colspan="2">
														О нас
													</th>
												</tr>
												<tr>
													<td>
														<i class="fas fa-clipboard-list"></i>
														<br/>
														<strong>Наши услуги</strong>
														<p></p>
														<p style={paragraphStyle}>
															Мы проконсультируем Вас в выборе дизайна<br/>
															Поможем подобрать оптимальное решение для Вашего помещения <br/>
															Предоставим Вам проект, соответсвующий Вашим пожеланиям, бюджету и срокам. 
														</p>
													</td>
													<td>
														<i class="fas fa-briefcase"></i>
														<br/>
														<strong>Как мы работаем</strong>
														<p></p>
														<p style={paragraphStyle}>Вы можете обратиться уже с приобретенной мебелью. Мы гарантируем профессиональную и качественную сборку.<br/>
														Вы можете прислать нам Ваши пожелания, и мы предложим Вам возможные варианты, на основе существующих моделей или индивидуальную сборку.
														</p>
													</td>
												</tr>
												<tr>
													<td>
														<i class="far fa-calendar-check"></i>
														<br/>
														<strong>Наши преимущества</strong>
														<p></p>
														<p style={paragraphStyle}>
															Опытность : даже если сам производитель не уверен, как это должно быть сделано - мы знаем.<br/> 
															Результат : в нашей мебели хранили вещи дети, а теперь хранят дети их детей. <br/>
															Коммуникабельность : Вы - правы. <br/>
															Помощь : если Вы не до конца уверены, что правы - мы с радостью Вам подскажем и поможем.  
														</p>
													</td>
													<td>
														<i class="far fa-question-circle"></i>
														<br/>
														<strong>Обращайтесь</strong>
														<p></p>
														<p style={paragraphStyle}>
															Если у Вас остались вопросы, или Вы хотели бы уточнить что-то - Вы можете воспользоваться формой на главной странице,
															указав удобный способ связи (и время в письме) и прикрепив фото. Или можете позвонить по нашему контактному номеру : {ContactNumber}.  
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</article>
						</main>
					</id>
				</div>
			</div>	
    	);
  	}
}

export default AboutPage;