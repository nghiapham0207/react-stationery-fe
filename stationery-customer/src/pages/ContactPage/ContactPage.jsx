import BreadCrumb from "../../components/Breadcrumb";
import HeroSection from "../../components/HeroSection";
import SectionContainer from "../../components/SectionContainer";

const breadcrumb = [{ label: "Home", url: "/" }, { label: "Contact" }];

export default function ContactPage() {
	return (
		<>
			<HeroSection className="hero hero-normal" />
			<BreadCrumb items={breadcrumb} />
			<SectionContainer className="contact spad">
				<div className="row">
					<div className="col-lg-3 col-md-3 col-sm-6 text-center">
						<div className="contact__widget">
							<span className="icon_phone" />
							<h4>Phone</h4>
							<p>+01-3-8888-6868</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 text-center">
						<div className="contact__widget">
							<span className="icon_pin_alt" />
							<h4>Address</h4>
							<p>60-49 Road 11378 New York</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 text-center">
						<div className="contact__widget">
							<span className="icon_clock_alt" />
							<h4>Open time</h4>
							<p>10:00 am to 23:00 pm</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-3 col-sm-6 text-center">
						<div className="contact__widget">
							<span className="icon_mail_alt" />
							<h4>Email</h4>
							<p>hello@colorlib.com</p>
						</div>
					</div>
				</div>
			</SectionContainer>
			<div className="map">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.106578733506!2d106.6912619!3d10.8031486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c51df044af%3A0xc47e9263d12b9120!2zNDlBIFBoYW4gxJDEg25nIEzGsHUsIFBoxrDhu51uZyAzLCBCw6xuaCBUaOG6oW5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1691673954568!5m2!1svi!2s"
					width={600}
					height={450}
					style={{ border: 0 }}
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>
			<div className="contact-form spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="contact__form__title">
								<h2>Leave Message</h2>
							</div>
						</div>
					</div>
					<form action="#">
						<div className="row">
							<div className="col-lg-6 col-md-6">
								<input type="text" placeholder="Your name" />
							</div>
							<div className="col-lg-6 col-md-6">
								<input type="text" placeholder="Your Email" />
							</div>
							<div className="col-lg-12 text-center">
								<textarea placeholder="Your message" defaultValue={""} />
								<button type="submit" className="site-btn">
									SEND MESSAGE
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
