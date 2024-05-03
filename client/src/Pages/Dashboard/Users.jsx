import React, { useState } from "react";

import { Modal, useModal, Button } from "@geist-ui/core";
import phiphiImage from "../../../public/upload/1713844132337phiphi.jpg";

const Users = () => {
  const { setVisible, bindings } = useModal();

  return (
    <>
      <div className="flex flex-col gap-8 p-p md:p-10">
        <h1>test</h1>
        <Button auto onClick={() => setVisible(true)}>
          Show Modal
        </Button>
        <Modal width="60rem" {...bindings}>
          <Modal.Title>My Favorites</Modal.Title>
          <Modal.Content>
            <div key="1" className="flex justify-center">
              <article className="prose prose-gray max-w-3xl mx-4 my-12 dark:prose-invert">
                <h1 className="text-4xl font-extrabold tracking-tight">
                  The Surprising Benefits of Laughter
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  By Jane Doe | Published on May 3, 2024
                </p>
                <p>
                  Laughter is often described as the best medicine, and for good
                  reason. Numerous studies have shown that laughter has a wide
                  range of physical and mental health benefits. From reducing
                  stress to boosting the immune system, the power of laughter
                  should not be underestimated.
                </p>
                <h2>Stress Relief</h2>
                <p>
                  One of the most well-known benefits of laughter is its ability
                  to alleviate stress. When we laugh, our bodies release
                  endorphins, which are natural feel-good chemicals that can
                  help reduce the physical symptoms of stress, such as muscle
                  tension and elevated heart rate. Laughter also triggers the
                  release of dopamine, a neurotransmitter that plays a key role
                  in regulating mood and emotions.
                </p>
                <figure className="lg:-mx-12 xl:-mx-20">
                  <img
                    alt="People laughing together"
                    className="aspect-video overflow-hidden rounded-lg object-contain"
                    height="340"
                    src={phiphiImage}
                    width="1250"
                  />
                  <figcaption className="text-center">
                    Laughter can help reduce stress and improve overall
                    well-being.
                  </figcaption>
                </figure>
                <h2>Immune System Boost</h2>
                <p>
                  Laughter has also been shown to have a positive impact on the
                  immune system. When we laugh, our bodies produce more of the
                  antibody immunoglobulin A (IgA), which helps protect us from
                  infections and illnesses. Additionally, laughter has been
                  linked to a decrease in the production of cortisol, a hormone
                  that can suppress the immune system when present in high
                  levels.
                </p>
                <h2>Improved Cardiovascular Health</h2>
                <p>
                  Believe it or not, laughter can also benefit our
                  cardiovascular health. Studies have found that laughter can
                  improve blood flow and reduce the risk of heart disease by
                  lowering blood pressure and improving the function of blood
                  vessels. Laughter has even been shown to have a similar effect
                  on the body as exercise, making it a valuable tool for
                  maintaining a healthy heart.
                </p>
                <p>
                  In conclusion, the benefits of laughter are truly remarkable.
                  Whether it's reducing stress, boosting the immune system, or
                  improving cardiovascular health, incorporating more laughter
                  into our daily lives can have a profound impact on our overall
                  well-being. So, the next time you're feeling stressed or down,
                  try to find something that makes you laugh – your body and
                  mind will thank you.
                </p>
              </article>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
};

export default Users;
