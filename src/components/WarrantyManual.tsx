import React from 'react'
import styled from 'styled-components'
import { Container } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const WarrantyManualSection = styled.section`
  padding: 0;
  background: #000000;
`

const BannerSection = styled.div`
  background: linear-gradient(135deg, #00a652, #008040);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/Banner3.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`

const BannerContent = styled.div`
  position: relative;
  z-index: 3;
  color: #ffffff;
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`

const BannerIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const WarrantyContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-top: -50px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    margin: 2rem 1rem;
    padding: 2rem;
  }
`

const WarrantyHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const WarrantyTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`

const WarrantySubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`

const WarrantySection = styled.div`
  margin-bottom: 2.5rem;
`

const SectionHeading = styled.h3`
  color: #00a652;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 0.5rem;
`

const SectionContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  font-size: 1rem;

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1rem;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #ffffff;
    }
  }

  strong {
    color: #00a652;
  }

  .warranty-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    overflow: hidden;
  }

  .warranty-table th,
  .warranty-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .warranty-table th {
    background: rgba(0, 166, 82, 0.2);
    color: #ffffff;
    font-weight: 600;
  }

  .warranty-table td {
    color: rgba(255, 255, 255, 0.9);
  }

  .highlight-box {
    background: rgba(255, 255, 255, 0.05);
    border-left: 3px solid #00a652;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
  }

  .warning-box {
    background: rgba(255, 100, 0, 0.1);
    border-left: 3px solid #ff6b6b;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;

    ul {
      color: rgba(255, 255, 255, 0.8);
      list-style: none;
      padding-left: 0;
      
      li {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 0.5rem;
        position: relative;
        padding-left: 1.5rem;
        
        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }

  .contact-info {
    background: rgba(0, 166, 82, 0.1);
    border: 1px solid rgba(0, 166, 82, 0.3);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    text-align: center;
  }
`

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;

  p {
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
  }

  strong {
    color: #00a652;
  }
`

const WarrantyManual: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  return (
    <WarrantyManualSection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-shield-alt"></i>
            </BannerIcon>
            <BannerTitle>Warranty Manual</BannerTitle>
            <BannerSubtitle>
              Comprehensive warranty coverage for your eSthira eBike. Quality assurance with clear terms and reliable service support.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <WarrantyContainer>
          <WarrantyHeader>
            <WarrantyTitle>Warranty Manual</WarrantyTitle>
            <WarrantySubtitle>
              We, eSthira Mobility Pvt. Ltd. ("Company") sell its Cycles ("Product") through its network of authorized dealers, to be free from any defect – both in material and workmanship, under normal use, subject to the following terms & conditions:
            </WarrantySubtitle>
          </WarrantyHeader>

          <WarrantySection>
            <SectionHeading>Components/Aggregates Warranty Period</SectionHeading>
            <SectionContent>
              <table className="warranty-table">
                <thead>
                  <tr>
                    <th>Components/Aggregates</th>
                    <th>Warranty Period (Months)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Frame</td>
                    <td>60 months from the date of purchase</td>
                  </tr>
                  <tr>
                    <td>Battery</td>
                    <td>24 months from the date of purchase</td>
                  </tr>
                  <tr>
                    <td>Hub Motor</td>
                    <td>24 months from the date of purchase</td>
                  </tr>
                  <tr>
                    <td>All Other Electronics</td>
                    <td>6 months from the date of purchase</td>
                  </tr>
                </tbody>
              </table>
              <div className="highlight-box">
                <p>
                  <strong>NOTE:</strong> For mechanical cycles, warranty coverage is limited to the frame only for a period of 5 years. All other components not listed in the above table are not covered under warranty as they are mostly wear-and-tear items.
                </p>
              </div>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Claims and Support</SectionHeading>
            <SectionContent>
              <p>
                All Claims and queries can be made by mail at <strong>info.esthira@gmail.com</strong> or <strong>info@esthira.com</strong>. Or call us at <strong>+91-9380276355</strong>. To help process your claim or query as quickly as possible please provide a proof of purchase, serial number (if any) and images to support your claim and any other information you can provide is always helpful.
              </p>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Warranty Coverage</SectionHeading>
            <SectionContent>
              <p>
                If any manufacturing defect(s) is found in our product, the Company will repair or replace the defective part(s) with new part(s) or equivalent at no cost, provided the Product is within warranty period and the malfunction is caused due to faulty material or workmanship during manufacturing. The decision to replace or repair a defective part will rest solely with the Company. We also reserve the right to use parts of the same or a different make as the defective part replacement, as per availability.
              </p>
              <div className="contact-info">
                <p>
                  <strong>Service Terms:</strong> Only the Company or its authorized dealers can repair, service or assemble/reassemble Product and it shall be the responsibility of the customer or purchaser to bring the faulty Product to our dealer premises.
                </p>
              </div>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Warranty Exclusions</SectionHeading>
            <SectionContent>
              <p>
                This warranty does not cover corrosive parts, plastic, PVC and rubber components or accessories adding to the decorative value of the Product.
              </p>
              <div className="warning-box">
                <p>
                  <strong>Important:</strong> All Mechanical parts are only covered for Manufacturing Defects. There is no warranty period on handlebars, stem, bearings, drivetrain parts, brakes, wires, wire housings, tires, tubes, rim or wheels, hubs, seat or saddle, seat post, clamps, grips, headset parts, pedals, brake calipers, bottom bracket, disk, brake pads and mudguards.
                </p>
              </div>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Battery Warranty</SectionHeading>
            <SectionContent>
              <div className="highlight-box">
                <p>
                  <strong>Special Application:</strong> Battery used in Product is special application battery meant only for eBikes. Do not use these for any other application or product.
                </p>
              </div>
              <p>
                Company reserves the right to change or withdraw any or all terms of battery warranty without any prior information.
              </p>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Maintenance and Safety</SectionHeading>
            <SectionContent>
              <p>
                All Product should be periodically checked as per the recommended service schedule by our authorized dealer for indications of potential failures including cracks, wire damage, corrosion, dents, deformation, paint peeling and any other indications of potential problems, inappropriate use or abuse. These are important safety checks and very important to help prevent accidents, bodily injury to the rider and shortened useful product life cycle of a Product.
              </p>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Battery Performance Reference</SectionHeading>
            <SectionContent>
              <p>
                Since Lithium ion batteries have a tendency of self-degradation, hence Mileage per charge will reduce with ageing. Reference chart for the same is as follows:
              </p>
              <table className="warranty-table">
                <thead>
                  <tr>
                    <th>Tenure (Months)</th>
                    <th>Tentative Mileage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0-12</td>
                    <td>85-100% of Claimed Mileage</td>
                  </tr>
                  <tr>
                    <td>13-18</td>
                    <td>75-85% of Claimed Mileage</td>
                  </tr>
                  <tr>
                    <td>19-24</td>
                    <td>60-75% of Claimed Mileage</td>
                  </tr>
                </tbody>
              </table>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Warranty Void Conditions</SectionHeading>
            <SectionContent>
              <div className="warning-box">
                <p>
                  <strong>This warranty is void in its entirety by any of the following conditions:</strong>
                </p>
                <ul>
                  <li>The serial number/identification code is deleted, defaced, altered, effaced or removed</li>
                  <li>Used for more than permissible load</li>
                  <li>Used for stunts, competition or jumping, acrobatics, bicycle moto–cross, dirt biking or similar activities as all units are not designed or intended for such purpose or usage</li>
                  <li>Any kind of tempering observed with the parts/Product</li>
                  <li>Modified/altered components for any specific use other than a personal transport.</li>
                  <li>Transportation, delivery, labor and handling charges incurred in the replacement of parts are not covered under this warranty, and shall be borne by the customer.</li>
                  <li>This warranty is void in its entirety by any modification of the frame, fork or components</li>
                  <li>Any kind of settings changed</li>
                </ul>
              </div>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Additional Terms</SectionHeading>
            <SectionContent>
              <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                <li style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                  <span style={{ position: 'absolute', left: '0', color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
                  Resold to any other person/company
                </li>
                <li style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                  <span style={{ position: 'absolute', left: '0', color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
                  Damage caused by an accident or malfunction or misuse caused to the Product by acts of persons, intentional or otherwise, including but not limited to misuse or mishandling, fire or any act of God
                </li>
                <li style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                  <span style={{ position: 'absolute', left: '0', color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
                  Nonfunctional due to natural wear and tear, ageing, defect resulted from misuse/ improper handling or negligence by the rider
                </li>
                <li style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                  <span style={{ position: 'absolute', left: '0', color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
                  Product is altered by component parts substitution or used for rental or any other commercial uses
                </li>
                <li style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                  <span style={{ position: 'absolute', left: '0', color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
                  Not operated, not charged or maintained as per guidelines
                </li>
              </ul>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Electronic System Warranty</SectionHeading>
            <SectionContent>
              <div className="warning-box">
                <p>
                  <strong>Important:</strong> Customers are strictly advised not to modify or alter any system, controller, or software settings of the electric cycle.
                </p>
              </div>
              <p>
                Any change in factory-set parameters will automatically void the warranty, without prior notice. If any malfunction, damage, or performance issue arises due to such unauthorized settings changes, responsibility shall solely lie with the customer. In such cases, all repair, replacement, and service costs will be entirely borne by the customer, including parts, transportation and labor.
              </p>
            </SectionContent>
          </WarrantySection>

          <WarrantySection>
            <SectionHeading>Geographic Limitation</SectionHeading>
            <SectionContent>
              <p>
                This warranty is valid only within the geographical boundaries of Bengaluru (Karnataka state). Company reserves the right to change this warranty policy at its sole discretion without any notice. In case of any dispute with the customer, the courts of Bengaluru shall have exclusive jurisdiction to settle any dispute.
              </p>
            </SectionContent>
          </WarrantySection>

          <ContactInfo>
            <p>
              For warranty claims and support, please contact us at <strong>info.esthira@gmail.com</strong> or call <strong>+91-9380276355</strong> with your proof of purchase and product details.
            </p>
          </ContactInfo>
        </WarrantyContainer>
      </Container>
    </WarrantyManualSection>
  )
}

export default WarrantyManual
